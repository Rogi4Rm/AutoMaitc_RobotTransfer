app.get("/data/:date", (req, res) => {
  const { date } = req.params;
  try {
    const stmt = db.prepare("SELECT red_boxes, green_boxes, blue_boxes FROM stats WHERE date = ?");
    const rows = stmt.all(date);

    const total = rows.reduce(
      (acc, row) => {
        acc.red += row.red_boxes;
        acc.green += row.green_boxes;
        acc.blue += row.blue_boxes;
        return acc;
      },
      { red: 0, green: 0, blue: 0 }
    );

    res.json(total);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching stats" });
  }
});

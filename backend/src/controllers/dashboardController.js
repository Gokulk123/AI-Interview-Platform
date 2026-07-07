const Dashboard = require("../models/dashboardModel");

const getDashboard = (req, res) => {
  try {
    const userId = req.user.id;
    const dashboard = Dashboard.getDashboardStats(userId);
    res.status(200).json({
      message: "Dashboard fetched successfully",
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE, // true in production
      sameSite: process.env.COOKIE_SAMESITE
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};

module.exports = { logoutUser };
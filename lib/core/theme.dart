import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Color Palette
  static const Color primary = Color(0xFFD48806); // StudentOS Orange
  static const Color primaryDark = Color(0xFFB56F0C);
  static const Color background = Color(0xFFF7F1E6); // Beige background
  static const Color panel = Color(0xEDFFFFFF); // Translucent white panels
  static const Color textBody = Color(0xFF1F1B17);
  static const Color textMuted = Color(0xFF87755B);
  static const Color line = Color(0x3DD4A560); // Subtle beige line

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorSchemeSeed: primary,
      scaffoldBackgroundColor: background,
      textTheme: GoogleFonts.barlowTextTheme().copyWith(
        displayLarge: GoogleFonts.cinzel(
          fontWeight: FontWeight.w800,
          color: textBody,
          letterSpacing: 1.2,
        ),
        displayMedium: GoogleFonts.cinzel(
          fontWeight: FontWeight.w700,
          color: textBody,
        ),
        headlineSmall: GoogleFonts.barlowCondensed(
          fontWeight: FontWeight.w700,
          letterSpacing: 1.5,
          color: primaryDark,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: textBody,
          fontSize: 22,
          fontWeight: FontWeight.bold,
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Colors.white,
        indicatorColor: primary.withOpacity(0.15),
        labelTextStyle: MaterialStateProperty.all(
          const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}

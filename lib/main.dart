import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme.dart';
import 'providers/app_provider.dart';
import 'screens/shell.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => StudentOSProvider(),
      child: const StudentOSApp(),
    ),
  );
}

class StudentOSApp extends StatelessWidget {
  const StudentOSApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StudentOS',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const Shell(),
    );
  }
}

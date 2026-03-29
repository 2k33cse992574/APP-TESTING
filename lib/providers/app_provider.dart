import 'package:flutter/material.dart';

class MarketplaceItem {
  final String id;
  final String title;
  final String seller;
  final String category;
  final double price;
  final String imageUrl;
  final String description;

  MarketplaceItem({
    required this.id,
    required this.title,
    required this.seller,
    required this.category,
    required this.price,
    this.imageUrl = 'https://via.placeholder.com/150',
    this.description = 'Item is as described. Great condition.',
  });
}

class Gig {
  final String id;
  final String title;
  final String company;
  final String category;
  final int reward;
  final String duration;
  String status;

  Gig({
    required this.id,
    required this.title,
    required this.company,
    required this.category,
    required this.reward,
    required this.duration,
    this.status = 'open',
  });
}

class StudentOSProvider extends ChangeNotifier {
  // User Data
  String username = "Ananya R.";
  String college = "NIT Delhi";
  int walletBalance = 1450;
  int pendingPayout = 1200;
  int profileScore = 82;
  double rating = 4.7;

  // Gigs Data
  List<Gig> gigs = [
    Gig(id: 'gig-1', title: 'Social media post series', company: 'Campus Brand', category: 'Design', reward: 2200, duration: '5 days'),
    Gig(id: 'gig-2', title: 'Excel data cleanup', company: 'Local MSME', category: 'Data', reward: 1800, duration: '3 days'),
  ];

  // Marketplace Data (New Feature)
  List<MarketplaceItem> marketplace = [
    MarketplaceItem(id: 'item-1', title: 'Economics textbook', seller: 'Rahul S.', category: 'Books', price: 450),
    MarketplaceItem(id: 'item-2', title: 'Dell Keyboard (Mechanical)', seller: 'Neha R.', category: 'Tech', price: 1200),
    MarketplaceItem(id: 'item-3', title: 'A3 Drawing Board', seller: 'Priya K.', category: 'Stationery', price: 800),
  ];

  void addMarketplaceItem(MarketplaceItem item) {
    marketplace.insert(0, item);
    notifyListeners();
  }

  void updateWallet(int amount) {
    walletBalance += amount;
    notifyListeners();
  }

  void applyToGig(String gigId) {
    final index = gigs.indexWhere((g) => g.id == gigId);
    if (index != -1) {
      gigs[index].status = 'applied';
      notifyListeners();
    }
  }
}

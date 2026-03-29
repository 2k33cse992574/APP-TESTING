import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/app_provider.dart';
import '../../widgets/app_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<StudentOSProvider>(context);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: true,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Welcome back, ${state.username}', style: const TextStyle(fontSize: 14, color: Colors.grey)),
                const Text('StudentOS', style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
            actions: [
              IconButton(icon: const Icon(Icons.notifications_none), onPressed: () {}),
              IconButton(icon: const Icon(Icons.settings_outlined), onPressed: () {}),
            ],
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                const Text(
                  'Student living, earning, and growth in one place.',
                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, height: 1.1),
                ),
                const SizedBox(height: 20),
                _buildStatGrid(state),
                const SizedBox(height: 24),
                AppCard(
                  title: 'Next high-value gig',
                  tag: 'Primary hook',
                  content: 'Apply for social media content creation, Canva design, or website fixes and earn ₹500–₹10,000 per task.',
                  buttonLabel: 'Browse gigs',
                  onPressed: () {},
                ),
                const SizedBox(height: 16),
                AppCard(
                  title: 'Marketplace',
                  tag: 'New Feature',
                  isLight: true,
                  content: 'Buy and sell textbooks, electronics, and stationery from your fellow students.',
                  buttonLabel: 'Explore Shop',
                  onPressed: () {},
                ),
                const SizedBox(height: 16),
                AppCard(
                  title: 'Daily Essentials',
                  tag: 'High frequency',
                  isLight: true,
                  content: 'PG discovery with verified reviews, monthly mess subscriptions, and laundry.',
                  buttonLabel: 'Open Housing',
                  onPressed: () {},
                ),
                const SizedBox(height: 24),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatGrid(StudentOSProvider state) {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 1.4,
      children: [
        _StatCard('Wallet', '₹${state.walletBalance}', 'Available'),
        _StatCard('Active Gigs', '${state.gigs.length}', 'Track tasks'),
        _StatCard('Profile Score', '${state.profileScore}/100', 'Verified'),
        _StatCard('Services', '0', 'Requested'),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title, value, meta;
  const _StatCard(this.title, this.value, this.meta);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.black12),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 2),
          Text(meta, style: const TextStyle(fontSize: 10, color: Colors.blueGrey)),
        ],
      ),
    );
  }
}

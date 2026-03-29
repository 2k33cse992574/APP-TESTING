import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/app_provider.dart';

class GigsScreen extends StatelessWidget {
  const GigsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<StudentOSProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gigs', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(icon: const Icon(Icons.history_edu_outlined), onPressed: () {}),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Earn Money ⚡', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  const Text('Complete short tasks and build your professional portfolio.', style: TextStyle(color: Colors.grey)),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final gig = state.gigs[index];
                  return _GigCard(gig);
                },
                childCount: state.gigs.length,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _GigCard extends StatelessWidget {
  final Gig gig;
  const _GigCard(this.gig);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black12),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.orange.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(gig.category.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.orange)),
              ),
              Text('₹${gig.reward}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFFB56F0C))),
            ],
          ),
          const SizedBox(height: 12),
          Text(gig.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text('${gig.company} • ${gig.duration}', style: const TextStyle(fontSize: 12, color: Colors.blueGrey)),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: gig.status == 'open' ? () {
                Provider.of<StudentOSProvider>(context, listen: false).applyToGig(gig.id);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Applied successfully!')));
              } : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: gig.status == 'open' ? const Color(0xFFD48806) : Colors.grey,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: Text(gig.status == 'open' ? 'Apply Now' : 'Application Sent'),
            ),
          ),
        ],
      ),
    );
  }
}

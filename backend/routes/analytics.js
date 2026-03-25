const express = require('express');
const Scan = require('../models/Scan');
const router = express.Router();

// User Analytics
router.get('/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const scans = await Scan.find({ userId });
    
    const totalScans = scans.length;
    let highRiskCount = 0;
    let lowRiskCount = 0;
    let fakeCount = 0;
    
    // Initialize Chart Data Layout (last 6 hours)
    const chartData = { labels: [], highRisk: [], lowRisk: [] };
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getTime() - (i * 60 * 60 * 1000));
      chartData.labels.push(String(d.getHours()).padStart(2, '0') + ':00');
      chartData.highRisk.push(0);
      chartData.lowRisk.push(0);
    }

    scans.forEach(scan => {
      if (scan.risk === 'HIGH') highRiskCount++;
      else lowRiskCount++; // groups low/medium as general low-risk metrics

      if (scan.status === 'FAKE') fakeCount++;

      // Chart Mapping
      const scanDate = new Date(scan.createdAt);
      const diffHours = (now.getTime() - scanDate.getTime()) / (1000 * 60 * 60);
      if (diffHours <= 6) {
        const label = String(scanDate.getHours()).padStart(2, '0') + ':00';
        const index = chartData.labels.indexOf(label);
        if (index !== -1) {
          if (scan.risk === 'HIGH') chartData.highRisk[index]++;
          else chartData.lowRisk[index]++; 
        }
      }
    });
    
    const detectionRate = totalScans > 0 ? ((fakeCount / totalScans) * 100).toFixed(2) + '%' : '0%';
    
    res.json({
      totalScans,
      highRiskCount,
      lowRiskCount,
      detectionRate,
      chartData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Analytics
router.get('/admin/analytics', async (req, res) => {
  try {
    const scans = await Scan.find();
    
    const totalScans = scans.length;
    let highRiskCount = 0;
    let lowRiskCount = 0;
    let fakeCount = 0;
    
    const threatCounts = {};

    // Initialize Chart Data Layout (last 6 hours)
    const chartData = { labels: [], highRisk: [], lowRisk: [] };
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getTime() - (i * 60 * 60 * 1000));
      chartData.labels.push(String(d.getHours()).padStart(2, '0') + ':00');
      chartData.highRisk.push(0);
      chartData.lowRisk.push(0);
    }
    
    scans.forEach(scan => {
      if (scan.risk === 'HIGH') highRiskCount++;
      else lowRiskCount++;

      if (scan.status === 'FAKE') {
        fakeCount++;
        const threatType = scan.reason || 'Unknown threat';
        threatCounts[threatType] = (threatCounts[threatType] || 0) + 1;
      }

      // Chart Mapping
      const scanDate = new Date(scan.createdAt);
      const diffHours = (now.getTime() - scanDate.getTime()) / (1000 * 60 * 60);
      if (diffHours <= 6) {
        const label = String(scanDate.getHours()).padStart(2, '0') + ':00';
        const index = chartData.labels.indexOf(label);
        if (index !== -1) {
          if (scan.risk === 'HIGH') chartData.highRisk[index]++;
          else chartData.lowRisk[index]++; 
        }
      }
    });
    
    let mostFrequentThreat = 'None';
    let maxCount = 0;
    
    for (const [threat, count] of Object.entries(threatCounts)) {
      if (count > maxCount) {
        mostFrequentThreat = threat;
        maxCount = count;
      }
    }
    
    const detectionRate = totalScans > 0 ? ((fakeCount / totalScans) * 100).toFixed(2) + '%' : '0%';

    res.json({
      totalScans,
      highRiskCount,
      lowRiskCount,
      detectionRate,
      mostFrequentThreat,
      chartData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

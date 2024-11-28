import React from "react";

export default function Reports() {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-background/50">
            <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
              [Chart Placeholder]
            </div>
          </div>
          
          <div className="p-6 rounded-2xl border border-border bg-background/50">
            <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
            <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              [Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    );
  }
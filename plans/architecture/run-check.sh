#!/usr/bin/env bash
set -euo pipefail

echo "🏛️  Checking TypeScript architecture with dependency-cruiser..."

if ! command -v depcruise &> /dev/null; then
    echo "❌ dependency-cruiser not found. Install with: npm install -g dependency-cruiser"
    exit 1
fi

depcruise --config plans/architecture/.dependency-cruiser.js src

echo "✅ Architecture checks passed!"

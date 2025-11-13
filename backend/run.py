#!/usr/bin/env python
"""
Quick start script for CPU Insight Engine Backend
"""

import sys
import subprocess
from pathlib import Path


def check_requirements():
    """Check if required packages are installed"""
    try:
        import fastapi
        import pandas
        import sklearn
        import uvicorn
        return True
    except ImportError as e:
        print(f"❌ Missing required packages: {e}")
        print("\n📦 Installing requirements...")
        
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Requirements installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install requirements")
            print("Please run manually: pip install -r requirements.txt")
            return False


def main():
    print("=" * 60)
    print("🚀 CPU Insight Engine - Backend Server")
    print("=" * 60)
    print()
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Check if CSV exists
    csv_path = Path(__file__).parent.parent / "CPU_benchmark_v4_modified.csv"
    if not csv_path.exists():
        print(f"⚠️  Warning: CSV file not found at {csv_path}")
        print("The server will fail to start without the data file.")
        response = input("Continue anyway? (y/N): ")
        if response.lower() != 'y':
            sys.exit(1)
    
    print("\n📊 Starting server...")
    print("🌐 API will be available at: http://localhost:8000")
    print("📖 API Docs: http://localhost:8000/api/docs")
    print("🏥 Health Check: http://localhost:8000/api/health")
    print("\nPress Ctrl+C to stop the server\n")
    print("=" * 60)
    print()
    
    # Start server
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )


if __name__ == "__main__":
    main()

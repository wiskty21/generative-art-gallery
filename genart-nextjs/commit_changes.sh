#!/bin/bash

# Navigate to repository root
cd /Users/fujinoyuki/Desktop/genart

# Check git status
echo "=== Git Status ==="
git status

# Add all changes
echo -e "\n=== Adding all changes ==="
git add .

# Create commit with detailed message
echo -e "\n=== Creating commit ==="
git commit -m "$(cat <<'EOF'
Restructure repository: move Next.js project to root level

Major folder restructuring to clean up the repository architecture:

• Moved all Next.js project files from genart-nextjs/ subdirectory to root level
• Moved legacy HTML files (index.html, index-basic.html, sketch.js) to legacy/ folder  
• Moved all Processing files (*.pde) to legacy/ folder for historical reference
• Updated GitHub Actions workflow in .github/workflows/deploy.yml for root-level structure
• Removed the now-empty genart-nextjs/ subdirectory

This restructuring provides a cleaner repository layout with the Next.js project 
at the root level, while preserving all legacy implementations in an organized 
legacy/ folder. The deployment workflow has been updated to work with the new 
structure for seamless GitHub Pages deployment.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Show final status
echo -e "\n=== Final Status ==="
git status
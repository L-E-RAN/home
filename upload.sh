#!/bin/bash

# נווט לתיקייה שבה נמצאים קבצי האתר שלך
cd /C/Users/Eliran\ Ashwal/Desktop/InnovativeBroomShop

# הסרת כל הקבצים מהמאגר ב-GitHub (ללא מחיקתם מהמחשב המקומי)
git rm -r --cached *

# יצירת commit למחיקת הקבצים מהמאגר
git commit -m "Remove all files from GitHub repository"

# דחיפת השינויים ל-branch 'main' ב-GitHub
git push origin main

# הוספת כל הקבצים המקומיים שוב למעקב
git add .

# יצירת commit חדש עם כל הקבצים מהתיקייה המקומית
git commit -m "Upload fresh content from local directory"

# דחיפת השינויים ל-branch 'main' ב-GitHub
git push origin main

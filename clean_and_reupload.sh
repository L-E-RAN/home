#!/bin/bash

# נווט לתיקייה שבה נמצאים קבצי האתר שלך
cd /C/Users/Eliran\ Ashwal/Desktop/InnovativeBroomShop

# מחיקת כל הקבצים מהמאגר ב-GitHub (ללא מחיקתם מהמחשב המקומי)
git rm -r --cached *

# יצירת commit למחיקת הקבצים מהמאגר ב-GitHub
git commit -m "Delete all files from GitHub repository"

# דחיפת השינויים למחיקת כל התוכן ב-branch 'main' ב-GitHub
git push origin main

# הוספת כל הקבצים המקומיים שוב למעקב
git add .

# יצירת commit חדש עם כל הקבצים מהתיקייה המקומית
git commit -m "Upload fresh content from local directory"

# דחיפת השינויים ל-branch 'main' ב-GitHub
git push origin main

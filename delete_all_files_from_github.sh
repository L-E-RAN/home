#!/bin/bash

# נווט לתיקייה שבה נמצאים קבצי האתר שלך
cd /C/Users/Eliran\ Ashwal/Desktop/InnovativeBroomShop

# הסרת כל הקבצים מהמאגר ב-GitHub (ללא מחיקתם מהמחשב המקומי)
git rm -r *

# יצירת commit למחיקת הקבצים
git commit -m "Delete all files from GitHub repository"

# דחיפת השינויים למחיקת כל התוכן ב-branch 'main' ב-GitHub
git push origin main

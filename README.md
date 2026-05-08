# 🎉 Birthday Surprise Website

A romantic, interactive birthday experience built with HTML, CSS, and JavaScript!

## 🎮 Game Progression

### Stage 1: Wordle Game 🎮
- Guess the secret word: **"PHATASS"**
- 6 attempts to get it right
- Color-coded feedback (green/yellow/gray)
- Unlocks birthday message + music

### Stage 2: Birthday Message 💕
- Personalized birthday wish
- **TIFL by Bayaan** plays on loop in the background
- Click "Next Challenge" to continue

### Stage 3: Connections Game 🎮
- Solve 4 groups of related items:
  - **BRAINROT**: Tung Tung Tung Sahur, Ballerina Cappucina, Bombardino Crocodilo, Tralalero Tralala
  - **PLACES WE'VE BEEN TO ON A DATE**: Scene 92, Nueplex, Xanders, Mcdonalds
  - **PET NAMES**: Sleepyhead, Bubs, Darling, Sly Bunny
  - **DEROGATORY RACIAL SLURS**: Coon, Jigaboo, Boy, Nigger
- 4 mistakes allowed
- Unlocks photo gallery

### Stage 4: Photo Gallery 📸
- View 6+ shared memories
- Each photo has a personalized caption
- Confetti celebration on completion!

---

## 📁 File Structure

```
/GF-BDAY
├── index.html        # Main HTML file
├── styles.css        # All styling
├── script.js         # Game logic
├── music/
│   └── tifl.mp3      # Background music
├── photo1.jpg        # Photo 1
├── photo2.jpg        # Photo 2
├── photo3.jpg        # Photo 3
├── photo4.jpg        # Photo 4
├── photo5.jpg        # Photo 5
├── photo6.jpg        # Photo 6
└── README.md         # This file
```

---

## 🚀 Deployment

### Enable GitHub Pages:
1. Go to **Settings** → **Pages**
2. Select **"Deploy from a branch"**
3. Choose **"main"** branch
4. Click **Save**

### Your Live Website:
```
https://hashimqazi.github.io/GF-BDAY/
```

---

## 📝 Customization

### Update Photo Captions:
Edit `index.html` and change:
```html
<p class="photo-caption">Add your caption here</p>
```

### Update Birthday Message:
Edit `index.html` lines 19-20:
```html
<p>You made it! Happy Birthday to my PHATASS! 😘</p>
<p>I love you more than anything in this world.</p>
```

### Change Colors:
Edit `styles.css` to modify the gradient background and theme colors.

---

## ✨ Features

✅ Wordle game with color feedback
✅ Connections game with 4 categories
✅ Auto-playing looping music
✅ Confetti animations
✅ Photo gallery with captions
✅ Responsive design (mobile & desktop)
✅ Keyboard & mouse support
✅ "One away..." hint system

---

## 📸 How to Add Photos

1. Go to your repository
2. Click **Add file** → **Upload files**
3. Upload `photo1.jpg` through `photo6.jpg`
4. Commit the changes
5. GitHub Pages will automatically update

---

## 🎵 Music Setup

1. Create a `/music` folder in your repo
2. Upload `tifl.mp3` to `/music/`
3. Music will auto-play when birthday message unlocks

---

## 💡 Tips

- Test the website before sharing by visiting your GitHub Pages link
- Make sure all photo filenames match the HTML (photo1.jpg, photo2.jpg, etc.)
- Customize captions to make each memory special
- Consider using compressed images for faster loading

---

## 🎉 Enjoy!

This website is a special way to celebrate an amazing person. Have fun! ❤️

package main

import (
	"fmt"
	//"os"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/oshanavishkapiries/watchON/scrapper/utils"
)

func main() {
	fmt.Println("Hello, World!")

	chromePath := utils.FindChromePath()
	if chromePath == "" {
		fmt.Println("❌ Chrome not found")
		return
	}

	fmt.Println("✅ Chrome found at:", chromePath)

	// Launch Chrome using Rod's launcher with the found path
	url := launcher.New().
		Bin(chromePath). // Use the detected Chrome path
		Leakless(false). // Set to true if you want to use the browser
		Headless(true).  // Set to false if you want to see the browser
		MustLaunch()

	// Connect to the browser
	browser := rod.New().ControlURL(url).MustConnect()
	defer browser.MustClose()

	// Create a new page and navigate
	page := browser.MustPage("https://streamtape.com/e/zwlALvx7q9SYDGe")

	// Wait for the page to fully load
	page.MustWaitLoad()

	// Get full HTML content
	//html := page.MustHTML()

	// Save HTML to file
	// err := os.WriteFile("page.html", []byte(html), 0644)
	// if err != nil {
	// 	fmt.Println("Error saving HTML:", err)
	// } else {
	// 	fmt.Println("✅ HTML saved to page.html")
	// }

	//videoURL := utils.StreamtapeVideoUrlParser(html)
	//fmt.Println("🎥 Extracted video URL:", videoURL)

	//videoURL := utils.StreamtapeVideoUrlFromFile("page.html")
	//fmt.Println("🎥 Extracted video URL:", videoURL)

}

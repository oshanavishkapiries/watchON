package utils

import (
	"regexp"
	"strings"
)

func StreamtapeVideoUrlParser(html string) string {

	re := regexp.MustCompile(`src="([^"]*streamtape\.com/get_video[^"]*)`)
	match := re.FindStringSubmatch(string(html))
	if len(match) < 2 {
		return ""
	}
	url := strings.ReplaceAll("https:"+match[1], "&amp;", "&")
	return url
}

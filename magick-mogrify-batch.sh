# batch conversions
# example: batch_magick *.jpg 50% .png
batch_magick() {
	magick mogrify -resize "$2" -format "$3" "$1"
}

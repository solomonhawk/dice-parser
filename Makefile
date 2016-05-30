SHELL  := /bin/bash
PATH   := ./node_modules/.bin:$(PATH)
OUT    := ./build

VPATH  := $(OUT)

all: clean javascript

javascript:
	NODE_ENV=production webpack -p --config config/webpack.js

watch:
	NODE_ENV=development webpack -w --config config/webpack.js

clean:
	rm -rf $(OUT)/*

.PHONY: all javascript watch clean

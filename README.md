# Deploy locally

This site is a Hugo site which uses the blowfish theme as a git submodule. Make
sure you have a recent version of `hugo` installed.

The themes are installed as sub-modules, so make sure to use the following command:


```
git clone --recurse-submodules --shallow-submodules https://github.com/tpf/tprf-hugo-site
hugo serve
```

# Site structure

## Page locations

Pages are stored in `/content` and can have the perce[ption of being in a subdirectory by setting the URL to have a subdirectory compoent.


### Image locations

Images should be stored in `static//images` however if there will be a collection of images for a page, a subdirectory should be made under images/ to group the images together.



## QR code aliases

To simplfy QR codes, create a short alias in the yaml header prefixed with `qr-`, for exxample:

```
url: '/fosdem/community-dinner.html'
aliases: '/qr-fd'
```

and link the QR code to this alias, which results in a much simpler QR.

Example QR generation:

```
qrencode -d 600 "https://perlfoundation.org/qr-fd" -o fosdem-community-dinner-qr.png
```

In this case, 600 dpi is used as the code might also be printed.




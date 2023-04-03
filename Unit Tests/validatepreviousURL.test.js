var validatepreviousURL = function (url) {
    //document.referrer
    const urlBefore = url.indexOf('codepen') > -1;
    
    return urlBefore
}

//Tests
test('Retuns False cause previous URL does not match with the regex', () => {
expect(validatepreviousURL("google.com")).toBe(false)
})
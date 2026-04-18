module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("selectattr", (arr, attr) => arr.filter(item => item[attr]));

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("logo.png");
  // Pass through pages that haven't been migrated to templates yet
  eleventyConfig.addPassthroughCopy("about.html");
  eleventyConfig.addPassthroughCopy("support.html");
  eleventyConfig.addPassthroughCopy("privacy-policy.html");
  eleventyConfig.addPassthroughCopy("apps.html");
  eleventyConfig.addPassthroughCopy("briannas-game-app.html");
  eleventyConfig.addPassthroughCopy("some-grid-puzzle-game.html");

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk"]
  };
};

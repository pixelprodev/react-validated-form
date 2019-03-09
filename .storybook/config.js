import { configure } from '@storybook/react'

const storyFiles = require.context('../src/', true, /\.storyfile\.js$/)

function loadStories() {
  storyFiles.keys().forEach((filename) => storyFiles(filename))
}

configure(loadStories, module)
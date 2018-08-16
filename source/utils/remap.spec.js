import { expect } from 'chai'
import remap from './remap'

test('Supports a string as a value resolver', () => {
  const resolve = remap({
    name: 'artistName',
  })

  expect(
    resolve({
      artistName: 'John',
    }),
  ).to.have.property('name', 'John')

  expect(resolve({})).to.have.property('name', undefined)
})

test('Supports array of value resolvers', () => {
  const remapName = remap({
    name: ['artistName', 'collectionName'],
  })

  expect(
    remapName({
      artistName: 'John',
    }),
  ).to.have.property('name', 'John')

  expect(
    remapName({
      collectionName: 'Fernando',
    }),
  ).to.have.property('name', 'Fernando')

  expect(remapName({})).to.have.property('name', undefined)
})

test('Supports function as a value resolver', () => {
  const normalizeExplicit = remap({
    explicit: origin => origin.explicitType === 'explicit',
  })

  expect(
    normalizeExplicit({
      explicitType: 'explicit',
    }),
  ).to.have.property('explicit', true)

  expect(
    normalizeExplicit({
      explicitType: null,
    }),
  ).to.have.property('explicit', false)
})

test('Supports various value resolvers in a single remap function', () => {
  const normalizeArtist = remap({
    id: 'artistId',
    genreName: ['primaryGenreName', 'collectionGenreName'],
    explicit: origin => origin.songType === 'explicit',
  })

  const res = normalizeArtist({
    artistId: 1,
    collectionGenreName: 'rock',
    songType: 'explicit',
  })

  expect(res).to.have.property('id', 1)
  expect(res).to.have.property('genreName', 'rock')
  expect(res).to.have.property('explicit', true)
})

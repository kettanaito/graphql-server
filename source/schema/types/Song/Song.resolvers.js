// @flow
import { Artist } from '~/schema/types/Artist/Artist.types'
import { Song } from './Song.types'

export default {
  Query: {
    songs(song: Song, args, context): Song[] {
      return context.SongController.getByAlbumId(args.albumId, context)
    },
  },
  Song: {
    artist(song: Song, args, context): Artist {
      return context.ArtistController.getById(song.artistId, context)
    },
  },
}

// @flow
import type { Album } from '~/schema/types/Album/Album.types'
import type { Artist } from './Artist.types'

export default {
  Artist: {
    coverImageUrl(artist: Artist, args, context): string {
      return context.ArtistController.getCoverImageUrl(artist, args, context)
    },
    albums(artist: Artist, args, context): Album[] {
      return context.AlbumController.getAlbumsByArtist(
        {
          artistId: artist.id,
          limit: args.limit,
        },
        context,
      )
    },
  },
  Query: {
    artist(artist: Artist, args, context): Artist {
      return args.id
        ? context.ArtistController.getById(args.id, context)
        : context.ArtistController.getBySlug(args, context)
    },
  },
}

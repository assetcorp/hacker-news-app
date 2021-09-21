
class News {
  constructor() { }

  __handleGetItemData = async ( itemId ) => {
    try {
      if ( !itemId ) throw new Error( 'Invalid item ID' )

      const request = await fetch( `https://hacker-news.firebaseio.com/v0/item/${itemId}.json` )
      if ( !request.ok ) throw new Error( 'Could not load item' )
      return await request.json() || null
    } catch ( error ) {
      console.error( error )
      return null
    }
  }

  __handleGetMaxItem = async () => {
    try {
      const request = await fetch( 'https://hacker-news.firebaseio.com/v0/maxitem.json' )
      if ( !request.ok ) throw new Error( 'Could not load max item' )
      return await request.text()
    } catch ( error ) {
      console.error( error )
      return 0
    }
  }

  __handleGetStoryType( type ) {
    switch ( type ) {
      case 'TOP':
        return 'topstories'
      case 'ASK':
        return 'askstories'
      case 'JOB':
        return 'jobstories'
      case 'SHOW':
        return 'jobstories'
      default:
        return 'topstories'
    }
  }

  async getStoryIds( limit = 10, offset = 0, type = 'TOP' ) {
    try {
      if ( type === 'ALL' ) {
        // Get max item id
        let maxItemId = await this.__handleGetMaxItem() || 500
        maxItemId = Number( maxItemId )
        console.log( maxItemId )
        const storyIds = Array( ( maxItemId - ( maxItemId - limit ) ) + 1 ).fill().map( ( _, idx ) => ( maxItemId - limit ) + idx )
        return storyIds
      } else {
        const request = await fetch( `https://hacker-news.firebaseio.com/v0/${this.__handleGetStoryType( type )}.json` )
        if ( !request.ok ) throw new Error( 'Could not load top stories' )
        const response = await request.json()
        const storyIds = response.slice( offset > 500 ? 500 - ( limit || 1 ) : offset, limit > 500 ? 500 : offset + limit )
        return storyIds
      }
    } catch ( error ) {
      console.error( error )
      return []
    }
  }

  async getItemData( itemId = null ) {
    return this.__handleGetItemData( itemId )
  }
}

export default News
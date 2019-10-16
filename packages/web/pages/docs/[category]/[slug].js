import { useRouter } from 'next/router'
import Layout from '~/components/layouts/DocsLayout'

const importReducer = ctx => {
  let keys = ctx.keys()
  let values = keys.map(ctx)
  return keys.reduce((o, k, i) => {
    o[k] = values[i]
    return o
  }, {})
}

// Import all docs
var Docs = []
Docs['packaged'] = importReducer(require.context('../../../content/docs/packaged', true, /.mdx$/))
Docs['admin-api'] = importReducer(require.context('../../../content/docs/admin-api', true, /.mdx$/))
Docs['realtime'] = importReducer(require.context('../../../content/docs/realtime', true, /.mdx$/))

// Set up all sidebars
var Sidebars = []
Sidebars['packaged'] = {
  documentation: ['getting-started'],
}
Sidebars['admin-api'] = {
  documentation: ['getting-started'],
}
Sidebars['realtime'] = {
  documentation: ['getting-started'],
}

export default function CategoryDocs() {
  const router = useRouter()
  let { category, slug } = router.query
  if (!category || !slug) return <div></div>

  const categoryDocs = Docs[category]
  const categorySidebar = enrichSidebar(Sidebars[category], categoryDocs)
  const documentation = categoryDocs[`./${slug}.mdx`]
  const Content = documentation.default
  const { metadata } = documentation
  const { title, description } = metadata

  return (
    <Layout sidebar={categorySidebar} activeCategory={category}>
      <div className="has-background-dark">
        <div className="content w-m-800 p-md p-t-xl p-b-xl">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{description}</p>
        </div>
      </div>
      <div className="content w-m-800 p-md">
        <Content />
      </div>
      <div className="w-m-800 p-md p-b-lg">
        <nav className="columns reverse-row-order">
          <div className="column ">
            <a className="box p-md">
              <p className="heading has-text-grey">Next</p>
              <p className="">Some post</p>
            </a>
          </div>
          <div className="column is-hidden-mobile "></div>
          <div className="column">
            <a className="box p-md has-text-right">
              <p className="heading has-text-grey">Previous</p>
              <p className="">Some post</p>
            </a>
          </div>
        </nav>
      </div>
    </Layout>
  )
}

/**
 * Fills the sidebar array with relevant metadata,
 */
const enrichSidebar = (sidebar, categoryDocs) => {
  return Object.keys(sidebar).reduce((acc, heading) => {
    acc[heading] = sidebar[heading].map(slug => {
      const documentation = categoryDocs[`./${slug}.mdx`]
      const { metadata } = documentation
      const { title, sidebarLabel } = metadata
      return { slug, title: sidebarLabel || title }
    })
    return acc
  }, {})
}
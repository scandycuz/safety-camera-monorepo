# Safety Camera Monorepo

This repository uses a monorepo structure to organize code into reusable packages for multiple applications. Shared React components, RTK Query APIs, and React contexts enable quick app development with minimal configuration.

## Primary frameworks and libraries

- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript language
- [React](https://react.dev/) - UI framework
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - Data fetching and caching
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Shadcn](https://ui.shadcn.com/) - Component library generation
- [Tailwind](https://tailwindcss.com/) - Inline styling
- [Next.js](https://nextjs.org/) - React web framework
- [Nx](https://nx.dev/) - Monorepo support and code generation

### RTK Query

The repo uses RTK Query for data fetching, manipulation, and caching. APIs are managed in the [apis package](./packages/apis/). Each external service requires it's own RTK Query API. Documentation for RTK Query can be found [here](https://redux-toolkit.js.org/rtk-query/overview).

### Redux Toolkit

State management unrelated to API data is handled using [Redux Toolkit](https://redux-toolkit.js.org/). To separate RTK Query data caching from other state management and increase code modularity, Redux Toolkit code lives in the [contexts package](./packages/contexts/) and is accessed using React Context instead of Redux. Documentation about React Context can be found [here](https://react.dev/learn/passing-data-deeply-with-context).

### Shadcn

The repo uses [Shadcn](https://ui.shadcn.com/) to create an internal component libary. Components live in the
[components package](./packages/components/), and new components can be added through the Shadcn CLI. The [Shadcn documentation](https://ui.shadcn.com/docs) provides information about it's use, however, generally new componenents will be added by navigating to the [components package](./packages/components/) and running a component generation script, such as `npx shadcn@latest add button`.

### Tailwind

Styling is handled using [Tailwind](https://tailwindcss.com/). This allows for easily styling components directly in component files.

New apps will need their own Tailwind setup. Documentation for this can be found [here](https://ui.shadcn.com/docs/installation). This allows each app to set it's own theme colors and styles as necessary.

### Nx

This repo utilizes Nx for monorepo support. Run `npx nx graph` to generate a visualization of the app and package dependencies.

#### Adding new apps and packages

Leveraging [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and [code generators](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) are recommended for adding new apps and packages. The most straightforward approach is through an IDE extension. [Install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

#### Additional Nx links

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

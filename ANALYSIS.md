# Analysis of the test

Hi there! I've completed the test in chunks:

- Replaced `yarn` with `npm` for dependency management and scripts.
- The rest of the test, which took about an hour.

## Why not yarn

Over the years I've had a lot of trouble with larger scale projects using `yarn`. The over-reliance on the lockfile can easily cause multiple copies of a single library to be included when an upgrade was actually needed. This can lead to hard to diagnose bugs, especially when multiple versions of React end up in the same project, which is bad for performance, not to mention it is bad practice for security.

Yarn also doesn't have any performance advantages over `npm` these days, so I see no reason to use it.

`pnpm` is a much better alternative and works really well with monorepos, but it's overkill for this test.

## The app

### Why the first pass was AI

To speed up the process of getting a working app, I used GitHub Copilot to generate the first pass of the React components. This allowed me to focus on fixing issues and improving the code rather than writing everything from scratch.

The generated code was a good starting point, but it needed significant adjustments to meet the requirements of the test and to ensure code quality.

The AI also added a count of items in the basket, which I thought was a usability improvement over the design so I kept it.

### Changes made

Other than the CSS changes to match the design, the biggest changes were structural, with the creation of a state store and then refactoring the component parts of the app to separate them out for re-use.

AI was helpful in doing the refactoring, and was pretty good at creating the unit tests for the components, and creating the types for the GraphQL API.

The AI's biggest issues were the CSS, which had a lot of issues, big and small. The app's structure was ok, but not set up well for the long-haul. I improved that through the refactoring process, making some elements more semantic, and improving accessibility. The specifications section would be _more_ semantic as a definition list, but I kept it as a table to match the design.

I'm not 100% confident on all the spacing, border radiuses or font weights, but I think it's close enough without getting the ruler out in Figma.

Thanks for the opportunity, and I look forward to your feedback!
---
title: Power of typeof & typestyle in react apps
date: '2018-11-23T15:23:04.284Z'
author: Artur
---

Have you ever heard of [typestyle](https://github.com/typestyle/typestyle)? No? It is a great no-webpack styling solutions. In my life I tried almost everything possible:

- pure CSS
- SCSS
- SASS
- CSS modules
- CSS Next
- inline react styles
- typestyle

Most of solutions are bundled with webpack which means if you want to write library which have extendable replacable styles included you mustn't use webpack! So automatically you need to disqualificate these solutions:

- CSS Next
- CSS modules
- SCSS
- SASS
- pure CSS

So lets take a closer look on these:

- inline react styles
- typestyle

Inline react styles are nice but producing spaghetti code

```tsx
import * as React from 'react'
export const MyInlineComponent = ({ children, style }) => (
  <div
    style={{
      fontSize: 15,
      ...style,
    }}
  >
    {children}
  </div>
)
```

Moreover you cannot include media and hover directives. Using onmouseover is ugly though and you need state to control that.

Lets try with typestyle then

```tsx
import * as React from 'react'
import { style, classes, media } from 'typestyle'

export const MyComponentStyle = style(
  {
    fontSize: 15,
    $nest: {
      '&:hover': {
        fontSize: 18,
      },
    },
  },
  media({ maxWidth: 480 }, { fontSize: 10 })
)

// Extending the style

const MyNewStyle = classes(
  MyComponentStyle,
  style({
    color: '#0ae',
  })
)

export const MyStyledComponent = ({ children, style = '' }) => (
  <div className={classes(MyNewStyle, style)}>{children}</div>
)
```

Looks great yeah? It is high time for advanced programmers style solution. Imagine a component which have more styles. I will write styles in separate file for this solution

styles.tsx

```tsx
import { style } from 'typestyle'

export const Title = style({
  fontSize: 18,
})
export const SubTitle = style({
  fontSize: 18,
})
export const ImageSize = style({
  width: 20,
  height: 20,
})
```

component.tsx

```tsx
import * as React from 'react'
import * as styles from './styles'

export const MyStyledComponent = ({
  overrideStyles = {},
}: {
  overrideStyles: typeof styles
}) => {
  const componentStyles = {
    ...styles,
    ...overrideStyles,
  }
  return (
    <div>
      <div className={componentStyles.Title}>Hello</div>
      <div className={componentStyles.SubTitle}>World</div>
      <img
        className={componentStyles.ImageSize}
        src="https://source.unsplash.com/random"
      />
    </div>
  )
}
```

usingComponent.tsx
```tsx
import * as React from "react";
import { style } from "typestyle";
import { MyStyledComponent } from "./component";

const Page = () => (
  <div>
    <MyStyledComponent
      overrideStyles={{
        Title: style({
          color: "#00F"
        })
      }}
    />
  </div>
);

```

Voila you can use the component and override its styles with full intelisense!! Just by using typeof on the module.
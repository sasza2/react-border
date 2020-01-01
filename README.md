# react-border
React library for creating SVG border around children property.

# Demo
https://codesandbox.io/s/competent-haslett-99502

# Installation

```sh
npm install react-border
```

# API
```js
Border.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  radius: PropTypes.number,
  size: PropTypes.number,
}

Border.defaultProps = {
  className: '',
  radius: 5,
  size: 4,
}
```

# How to use it

## Example 1
<p align='center'>
  <img src='./docs/1.png' alt='Example 1' />
</p>

```html
<Border className='example-1' radius={30} size={10}>
  <div style={{ padding: 15 }}>
    Nam eu pretium mi, nec ornare nisl
  </div>
</Border>
```

```css
.example-1__in {
  stroke-dasharray: 8 2;
  stroke: #2f416d;
}
```

## Example 2
<p align='center'>
  <img src='./docs/2.png' alt='Example 2' />
</p>

```html
<Border className='example-2' radius={10}>
  <div style={{ padding: 5 }}>
    Interdum et malesuada fames
  </div>
</Border>
```

```css
.example-2__in {
  stroke-dasharray: 10 3;
  stroke: #ffba92;
}
```

## Example 3
<p align='center'>
  <img src='./docs/3.png' alt='Example 3' />
</p>

```html
<Border className='example-3' radius={0} size={1}>
  <div style={{ padding: 3 }}>
    Vivamus lobortis mollis leo sit amet sodales
  </div>
</Border>
```

```css
.example-3__in {
  stroke-dasharray: 3 8;
}
```

## Example 4
<p align='center'>
  <img src='./docs/4.png' alt='Example 4' />
</p>

```html
<Border className='example-4' radius={20} size={2}>
  <div style={{ padding: 4 }}>
    Donec vehicula, est at volutpat tempor
  </div>
</Border>
```

```css
.example-4__in {
  stroke: #851de0;
}
```

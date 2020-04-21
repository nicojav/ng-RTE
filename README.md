# Editor

<p align="center">A Simple Editor for Angular Applications.</p>

## Getting Started

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install
```

### Usage

Import `editor` module

```typescript
import { EditorModule } from 'editor';

@NgModule({
  imports: [ EditorModule ]
})
```

Import [font-awesome](https://github.com/FortAwesome/Font-Awesome) into your application

Then in HTML

```html
<app-editor [(ngModel)]="htmlContent"></app-editor>
```

#### PeerDependencies

`editor` depeneds on the following libraries to work.

* [Font-Awesome v4.7.0](https://github.com/FortAwesome/Font-Awesome/tree/fa-4)
* [Ngx-Bootstrap](https://github.com/valor-software/ngx-bootstrap)

## Compatibility

All Evergreen-Browsers are supported

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Opera
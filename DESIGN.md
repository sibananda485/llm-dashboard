# Zustand store's structure

Following is the interface and structure of zustand store

```ts
interface StoreState {
  layout: Layout[];
  setLayout: (layout: Layout[]) => void;
  deleteWidget: (i: string) => void;
  addWidget: (i: string) => void;
}
```
```ts
export const useStore = create<StoreState>((set) => ({
  layout: initialLayout,
  setLayout: (layout: Layout[]) => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
    return set(() => ({ layout: layout }));
  },
  deleteWidget: (i: string) =>
    set(({ layout }) => ({ layout: layout.filter((item) => item.i != i) })),
  addWidget: (i: string) =>
    set(({ layout }) => ({
      layout: [
        ...layout,
        {i, x: layout.length % 3, y: Math.floor(layout.length / 3),w: 1,h: 4,},
      ],
    })),
}));
```

- `layout` - State that holds the complete state ( `Layout[]` ) of each grid item.
- `setLayout` - Sets the new layout whenever the layout changes ( resize, drag, add & remove widgets etc. )
- `deleteWidget` - function to delete a widget from layout.  
- `addWidget` - function to add a new widget to layout.  

## Interactivity across components with `Zustand`

Grid container of `react-grid-layout`

```tsx
<ResponsiveGridLayout
        layout={layout}
        onLayoutChange={setLayout}
        cols={3}
        rowHeight={100}
        draggableHandle=".yes-drag"
      >
```
- In above `layout` prop takes the state of layout array from the zustand store ( we saw in zustand state structure section )
- And `onLayoutChange` prop takes the setter function to set the layout array in the store when a layoutChange event triggers.

Adding a new widget in Dashboard

```js
const addWidget = useStore((state) => state.addWidget);

const handleAddWidget = (widget: WidgetTypes) => {
    addWidget(widget.i);
    setIsOpen(false);
    setSelectedWidget(null);
};
```

- Adding a new widget from Dashboard toolbar is super easy by passing i of new widget since we have already written `addWidget` funtion in zustand store

Delete a widget from Dashboard

```js
const deleteWidget = useStore((state) => state.deleteWidget);

<Button
    className="no-drag"
    variant={"outline"}
    size={"icon"}
    onClick={() => deleteWidget("token-usage")}
>
<X /> </Button>
```

- Deleting a widget from Widget Card is again super easy by passing i of the widget since we have already written `deleteWidget` function in zustand store itself


# Potential performance bottlenecks and how you would address them
Problem - 1
- Currently the dashboard layout is being stored in the user's browser's localstorage in order to persist the view so that user can view the same way he/she customized recenlty.
- But it will fail if user changes their PC/Laptop/Device or login in a different browser.
- `Solution` - We need to store users preference in database to ensure seamless persist view across device and browser

Problem - 2

- Currently dashboard data is REST API based, no real time updates.
- It will be less relavent for frequently changing date.
- `Solution` - We will need to implement socket or pulling for realtime updates and dynamic realtime dashboard UI.
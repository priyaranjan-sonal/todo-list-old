# Task Master — To-Do List App

A simple and clean to-do list app built as my first React learning project. It covers the core concepts of React like state management, hooks, and component structure, paired with a responsive UI using Tailwind CSS.

![Task Master](public/logo.png)

## Features

- **Add tasks** with a title and an optional description
- **Mark tasks as done** — completed tasks get a strikethrough style and a muted look
- **Undo completion** to bring a task back to active
- **Delete tasks** with a confirmation prompt to prevent accidental removal
- **Persistent storage** — tasks are saved to `localStorage` so they survive page refreshes
- **Task counter** showing how many tasks are in the list
- **Empty state** with a friendly prompt when no tasks exist
- Responsive layout — stacked on mobile, side-by-side on larger screens

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI and state management |
| Vite 7 | Build tool and dev server |
| Tailwind CSS 4 | Styling |
| Lucide React | Icons |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## What I Learned

This was my first hands-on project with React. Key concepts I practiced:

- `useState` for managing form inputs and the task list
- `useEffect` to sync state with `localStorage`
- Lifting state and passing handlers as props concepts
- Conditional rendering for the empty state and completed task styles
- Controlled inputs for the form fields
- Basic responsive layout with Tailwind CSS flexbox and grid utilities

## Project Structure

```
src/
├── App.jsx       # Main component — all logic and UI lives here
├── main.jsx      # React root entry point
└── index.css     # Tailwind import and custom scrollbar styles
```

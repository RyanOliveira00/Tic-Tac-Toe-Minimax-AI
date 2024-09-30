# Tic-Tac-Toe with Minimax AI

This project implements a Tic-Tac-Toe game with an AI based on the Minimax algorithm with Alpha-Beta pruning, developed using Next.js 14, React, and TypeScript.

## Overview

Tic-Tac-Toe is a web application that allows users to play against an intelligent AI. The AI uses the Minimax algorithm with Alpha-Beta pruning optimization to make decisions, resulting in a challenging and virtually unbeatable opponent.

### Features

- Interactive and responsive user interface
- Implementation of the Minimax algorithm with Alpha-Beta pruning
- Developed with Next.js 14, React, and TypeScript
- Styling with Tailwind CSS

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- npm (usually comes with Node.js) or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tic-tac-toe-minimax.git
   cd tic-tac-toe-minimax
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

## Running the Project

To start the development server:

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## How to Play

1. Access the application through the browser.
2. Click on any empty cell on the board to make your move.
3. The AI will automatically make its move after yours.
4. Continue playing until there's a winner or a draw.
5. Use the slider to adjust the AI's difficulty.

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Minimax Algorithm

The Minimax algorithm is a recursive search technique used in two-player games. It evaluates all possible moves and their consequences, assuming that the opponent will always make the best possible move.

Alpha-Beta pruning is an optimization of Minimax that significantly reduces the number of nodes evaluated in the search tree, improving performance without compromising the quality of the decision.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improvements.

## License

This project is licensed under the [MIT License](LICENSE).

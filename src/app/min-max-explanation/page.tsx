
export default function MinMaxExplanationPage() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">🚀</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          O Algoritmo Minimax com Poda Alfa-Beta
        </h1>
        <p className="mt-6">
          O algoritmo Minimax é amplamente utilizado em jogos de dois jogadores
          com informações completas, como o Xadrez ou Jogo da Velha, para tomar
          decisões ótimas. A ideia básica por trás do Minimax é que o jogador
          que está fazendo o movimento tenta maximizar sua pontuação (ou
          minimizar o ganho do adversário, dependendo do ponto de vista). No
          contexto de jogos, isso significa que, a cada turno, o jogador escolhe
          a jogada que levará à melhor pontuação possível, assumindo que o
          adversário também jogará da melhor forma possível.
        </p>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Como Funciona o Minimax?
        </h2>

        <p className="mt-3">
          O Minimax opera construindo uma árvore de todos os movimentos
          possíveis:
        </p>

        <ol className="mt-2 list-inside list-decimal">
          <li>
            Gera todas as jogadas possíveis a partir do estado atual do jogo.
          </li>
          <li>
            Para cada jogada, simula todas as respostas possíveis do oponente.
          </li>
          <li>
            Este processo é repetido até atingir um estado final (vitória,
            derrota ou empate) ou uma profundidade predefinida.
          </li>
          <li>Avalia cada estado final, atribuindo uma pontuação.</li>
          <li>
            Propaga os valores de volta para cima na árvore, escolhendo o valor
            máximo nos níveis do jogador e o mínimo nos níveis do oponente.
          </li>
        </ol>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          A Otimização com Poda Alfa-Beta
        </h2>

        <p className="mt-3">
          A poda Alfa-Beta é uma otimização do algoritmo Minimax que reduz
          significativamente o número de nós avaliados na árvore de busca, sem
          comprometer a qualidade da decisão final. Ela funciona mantendo dois
          valores, alfa e beta, que representam as melhores opções já garantidas
          para o jogador maximizador e minimizador, respectivamente.
        </p>

        <div className="mt-4 flex justify-center">
          <img
            src="/tree.png"
            alt="Diagrama do Algoritmo Minimax com Poda Alfa-Beta"
            className="rounded-lg shadow-lg"
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Figura 1: Representação visual do algoritmo Minimax com Poda Alfa-Beta
        </p>

  
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Implementação no Jogo da Velha</h2>

<p className="mt-3">
  No nosso código do Jogo da Velha, implementamos o Minimax com poda Alfa-Beta da seguinte forma:
</p>

<pre className="mt-3 bg-gray-100 p-4 rounded-lg overflow-x-auto">
  <code className="language-typescript">
{`  const getBestMove = (
    board: Board,
    player: Player,
    depth: number,
    alpha: number,
    beta: number,
  ): { index: number; score: number } => {
    const availableMoves = board.reduce<number[]>((acc, cell, index) => {
      // O(n)
      if (!cell) acc.push(index); // O(1)
      return acc; // O(1)
    }, []);

    if (depth === 0 || calculateWinner(board)) {
      // O(n)
      return { index: -1, score: evaluate(board) }; // O(n)
    }

    let bestMove = { index: -1, score: player === "O" ? -Infinity : Infinity }; // O(1)

    for (let i = 0; i < availableMoves.length; i++) {
      // O(m), onde m é o número de movimentos disponíveis
      const move = availableMoves[i]!; // O(1)
      const newBoard = [...board]; // O(n)
      newBoard[move] = player; // O(1)

      const { score } = getBestMove(
        newBoard,
        player === "O" ? "X" : "O",
        depth - 1,
        alpha,
        beta,
      ); // Recursão

      if (player === "O") {
        if (score > bestMove.score) {
          // O(1)
          bestMove = { index: move, score }; // O(1)
        }
        alpha = Math.max(alpha, bestMove.score); // O(1)
      } else {
        if (score < bestMove.score) {
          // O(1)
          bestMove = { index: move, score }; // O(1)
        }
        beta = Math.min(beta, bestMove.score); // O(1)
      }

      if (beta <= alpha) {
        break; // Poda alfa-beta
      }
    } // Complexidade: O(b^d), onde b é o fator de ramificação (no máximo 9) e d é a profundidade

    return bestMove;
  };`}
  </code>
</pre>

<p className="mt-4">
  Este código demonstra como o algoritmo Minimax com poda Alfa-Beta é implementado no contexto do Jogo da Velha. A recursão, alternância entre maximização e minimização, e a poda são claramente visíveis nesta implementação.
</p>

      
      </div>
    </div>
  );
}

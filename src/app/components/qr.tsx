import styles from "./qr.module.css";

type MatrixType = Array<Array<number>>;

const alphaNumericCharset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`;
const modeIndicator = `0010`;

const pads = [`11101100`, `00010001`];

const GF_SIZE = 256;
const PRIMITIVE_POLY = 0x11d;

const toAlphaNumeric = (char: string) =>
  alphaNumericCharset.indexOf(char.toUpperCase());

const gfAdd = (x: number, y: number) => x ^ y;

const size = 25;

const ecLength = 22;
const codewords = 22 * 8;

const patternNum1 = 2;
const patternNum2 = 3;

const maskPatterns: Array<{
  info: string;
  pattern: (row: number, col: number) => boolean;
}> = [
  { info: `011010101011111`, pattern: (row, col) => (row + col) % 2 === 0 },
  { info: `011000001101000`, pattern: (row, col) => row % 2 === 0 },
  { info: `011111100110001`, pattern: (row, col) => col % 3 === 0 },
  { info: `011101000000110`, pattern: (row, col) => (row + col) % 3 === 0 },
  {
    info: `010010010110100`,
    pattern: (row, col) => Math.floor(row / 2) % 2 === 0,
  },
  {
    info: `010000110000011`,
    pattern: (row, col) => ((row * col) % 2) + ((row * col) % 3) === 0,
  },
  {
    info: `010111011011010`,
    pattern: (row, col) => (((row * col) % 2) + ((row * col) % 3)) % 2 === 0,
  },
  {
    info: `010101111101101`,
    pattern: (row, col) => (((row * col) % 2) + ((row * col) % 3)) % 2 === 1,
  },
];

const reserveFormat = (matrix: MatrixType) => {
  matrix[8][8] = 0;
  for (let i = 0; i < 8; i++) {
    matrix[8][i] = 0;
    matrix[i][8] = 0;
    matrix[8][size - 1 - i] = 0;
    matrix[size - 1 - i][8] = 0;
  }
};

const addFinderPatterns = (matrix: MatrixType) => {
  const pattern = Array(7)
    .fill(null)
    .map((_, y) =>
      Array(7)
        .fill(0)
        .map((_, x) => {
          if (y == 0 || y == 6) return patternNum1;
          if (y == 1 || y == 5)
            return x == 0 || x == 6 ? patternNum1 : patternNum2;
          else if (x != 1 && x != 5) return patternNum1;
          else return patternNum2;
        })
    );
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      matrix[r][c] = pattern[r][c];
      matrix[size - 7 + r][c] = pattern[r][c];
      matrix[r][size - 7 + c] = pattern[r][c];
    }
  }
};

const addSeparators = (matrix: MatrixType) => {
  for (let i = 0; i <= 7; i++) {
    matrix[7][i] = 0;
    matrix[i][7] = 0;
    matrix[size - 8][i] = 0;
    matrix[i][size - 8] = 0;
    matrix[size - 8 + i][7] = 0;
    matrix[7][size - 8 + i] = 0;
  }
};

const addTimingPatterns = (matrix: MatrixType) => {
  for (let i = 8; i < matrix.length - 8; i++) {
    const bit = i % 2 === 0 ? 1 : 0;
    matrix[6][i] = bit;
    matrix[i][6] = bit;
  }
};

const addAlignmentPatterns = (matrix: MatrixType) => {
  const alignmentPattern = Array(5)
    .fill(null)
    .map((_, y) =>
      Array(5)
        .fill(0)
        .map((_, x) => {
          if (y == 0 || y == 4) return patternNum1;
          if (y == 1 || y == 3)
            return x == 0 || x == 4 ? patternNum1 : patternNum2;
          else if (x != 1 && x != 3) return patternNum1;
          else return patternNum2;
        })
    );
  const pos = 16;
  for (let r = 0; r < alignmentPattern.length; r++) {
    for (let c = 0; c < alignmentPattern[r].length; c++) {
      matrix[pos + r][pos + c] = alignmentPattern[r][c];
    }
  }
};

const writeData = (matrix: MatrixType, bits: string) => {
  let dataIndex = 0;
  let directionUp = true;
  for (let x = size - 1; x > 0; x -= 2) {
    if (x === 6) x--;
    for (
      let y = directionUp ? size - 1 : 0;
      directionUp ? y >= 0 : y < size;
      directionUp ? y-- : y++
    ) {
      for (let col = 0; col < 2; col++) {
        if (matrix[y] && matrix[y][x - col] === null) {
          matrix[y][x - col] = bits[dataIndex] === `1` ? 1 : 0;
          dataIndex++;
          if (dataIndex >= bits.length) break;
        }
      }
      if (dataIndex >= bits.length) break;
    }
    directionUp = !directionUp;
    if (dataIndex >= bits.length) break;
  }
};

const applyMaskPattern = (matrix: MatrixType, index: number) => {
  const { info, pattern } = maskPatterns[index];
  for (let i = 0; i < 7; i++) {
    matrix[8][i >= 6 ? i + 1 : i] = info[i] === `1` ? 1 : 0;
    matrix[size - i - 1][8] = info[i] === `1` ? 1 : 0;
  }
  for (let i = 0; i < 8; i++) {
    matrix[i >= 6 ? i + 1 : i][8] = info[14 - i] === `1` ? 1 : 0;
    matrix[8][size - i - 1] = info[14 - i] === `1` ? 1 : 0;
  }
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        row == 6 ||
        col == 6 ||
        (row <= 8 && col <= 8) ||
        (row <= 8 && col >= 17) ||
        (row >= 17 && col <= 8) ||
        (row >= 16 && row <= 20 && col >= 16 && col <= 20) ||
        (row == 17 && col == 8)
      )
        continue;
      if (pattern(row, col)) matrix[row][col] ^= 1;
    }
  }
};

const calculatePenaltyPoints = (matrix: MatrixType) => {
  let penalty = 0;

  for (let row = 0; row < size; row++) {
    let count = 1;
    for (let col = 1; col < size; col++) {
      if (matrix[row][col] === matrix[row][col - 1]) {
        count++;
        if (count == 5) penalty += 3;
        else if (count > 5) penalty++;
      } else {
        count = 1;
      }
    }
  }

  for (let col = 0; col < size; col++) {
    let count = 1;
    for (let row = 1; row < size; row++) {
      if (matrix[row][col] === matrix[row - 1][col]) {
        count++;
        if (count == 5) penalty += 3;
        else if (count > 5) penalty++;
      } else {
        count = 1;
      }
    }
  }

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const block = [
        matrix[row][col],
        matrix[row][col + 1],
        matrix[row + 1][col],
        matrix[row + 1][col + 1],
      ];
      if (block.every((v) => v === block[0])) penalty += 3;
    }
  }

  const pattern = `10111010000`;
  for (let row = 0; row < size; row++) {
    const r = matrix[row];
    for (let col = 0; col < size - pattern.length + 1; col++) {
      const arr = r.slice(col, pattern.length + col);
      if (arr.join(``) == pattern || arr.reverse().join(``) == pattern)
        penalty += 40;
    }
  }
  for (let col = 0; col < size; col++) {
    const column = matrix.map((x) => x[col]);
    for (let row = 0; row < size - pattern.length + 1; row++) {
      const arr = column.slice(row, pattern.length + row);
      if (arr.join(``) == pattern || arr.reverse().join(``) == pattern)
        penalty += 40;
    }
  }

  let blackCount = 0;
  let whiteCount = 0;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === 1) blackCount++;
      else whiteCount++;
    }
  }
  const totalModules = size * size;
  const ratio = Math.abs((blackCount - whiteCount) / totalModules);
  penalty += ratio > 0.5 ? 10 : 0;

  return penalty;
};

const selectBestMaskPattern = (matrix: MatrixType) => {
  let bestMatrix: MatrixType = matrix;
  let bestPenalty = Infinity;

  for (let i = 0; i < maskPatterns.length; i++) {
    const tempMatrix = matrix.map((row) => row.slice());
    applyMaskPattern(tempMatrix, i);
    const penalty = calculatePenaltyPoints(tempMatrix);

    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestMatrix = tempMatrix;
    }
  }

  return bestMatrix;
};

export default function Qr({ data }: { data: string }) {
  let bits: string = modeIndicator + data.length.toString(2).padStart(9, `0`);

  for (let i = 0; i < data.length; i += 2) {
    if (i + 1 < data.length) {
      bits += (toAlphaNumeric(data[i]) * 45 + toAlphaNumeric(data[i + 1]))
        .toString(2)
        .padStart(11, `0`);
    } else {
      bits += toAlphaNumeric(data[i]).toString(2).padStart(6, `0`);
    }
  }

  if (bits.length > codewords) return <div>Data is too long</div>;

  if (codewords - bits.length > 4) bits += `0000`;
  if (bits.length % 8) bits = bits.padEnd(Math.ceil(bits.length / 8) * 8, `0`);

  const len = (codewords - bits.length) / 8;
  for (let i = 0; i < len; i++) bits += pads[i % 2];

  let gf_exp = new Array(GF_SIZE);
  let gf_log = new Array(GF_SIZE);

  let x = 1;
  for (let i = 0; i < GF_SIZE; i++) {
    gf_exp[i] = x;
    gf_log[x] = i;
    x <<= 1;
    if (x & GF_SIZE) {
      x ^= PRIMITIVE_POLY;
    }
  }
  gf_exp[GF_SIZE] = gf_exp[0];

  const gfMultiply = (x: number, y: number) =>
    x === 0 || y === 0 ? 0 : gf_exp[(gf_log[x] + gf_log[y]) % (GF_SIZE - 1)];

  const polynomialMultiply = (a: Array<number>, b: Array<number>) => {
    let result = new Array(a.length + b.length - 1).fill(0);
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < b.length; j++)
        result[i + j] = gfAdd(result[i + j], gfMultiply(a[i], b[j]));

    return result;
  };

  const generateGeneratorPolynomial = (ecLength: number) => {
    let g = [1];
    for (let i = 0; i < ecLength; i++) {
      let poly = [1, gf_exp[i]];
      g = polynomialMultiply(g, poly);
    }
    return g;
  };

  const encodeMessage = (bits: string, ecLength: number) => {
    let generator = generateGeneratorPolynomial(ecLength);
    const message = (bits.match(/.{1,8}/g) || []).map((b) => parseInt(b, 2));
    let paddedMessage = [...message, ...new Array(ecLength).fill(0)];

    for (let i = 0; i < message.length; i++) {
      let coef = paddedMessage[i];
      if (coef !== 0) {
        for (let j = 0; j < generator.length; j++) {
          paddedMessage[i + j] = gfAdd(
            paddedMessage[i + j],
            gfMultiply(generator[j], coef)
          );
        }
      }
    }

    return paddedMessage
      .slice(message.length)
      .map((n) => n.toString(2).padStart(8, `0`))
      .join(``);
  };

  bits += encodeMessage(bits, ecLength);

  let matrix: MatrixType = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

  reserveFormat(matrix);

  addFinderPatterns(matrix);

  addSeparators(matrix);

  addTimingPatterns(matrix);

  addAlignmentPatterns(matrix);

  matrix[17][8] = 1;

  writeData(matrix, bits);

  matrix = selectBestMaskPattern(matrix);

  const colors = [`var(--bg)`, `var(--fg)`];

  return (
    <svg className={styles.svg} viewBox={`0 0 ${size * 10} ${size * 10}`}>
      {matrix
        .map((row, y) =>
          row.map(
            (color, x) =>
              colors[color] && (
                <rect
                  key={`${x}-${y}`}
                  x={x * 10 + 1.5}
                  y={y * 10 + 1.5}
                  width={10 - 3}
                  height={10 - 3}
                  fill={colors[color]}
                  rx={2}
                ></rect>
              )
          )
        )
        .flat()}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M215 70C234.33 70 250 54.33 250 35C250 15.67 234.33 0 215 0C195.67 0 180 15.67 180 35C180 54.33 195.67 70 215 70ZM215 60C228.807 60 240 48.8071 240 35C240 21.1929 228.807 10 215 10C201.193 10 190 21.1929 190 35C190 48.8071 201.193 60 215 60Z"
        fill="var(--accent)"
      />
      <path
        d="M226.401 21.4505L232 31.5495L224.372 35L232 38.4505L226.401 48.5495L219.666 43.4158L220.64 52H209.36L210.334 43.4158L203.599 48.5495L198 38.4505L205.628 35L198 31.5495L203.599 21.4505L210.334 26.5842L209.36 18H220.64L219.666 26.5842L226.401 21.4505Z"
        fill="var(--accent)"
        className={styles.star}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70 0H0V70H70V0ZM35 60C48.8071 60 60 48.8071 60 35C60 21.1929 48.8071 10 35 10C21.1929 10 10 21.1929 10 35C10 48.8071 21.1929 60 35 60Z"
        fill="var(--accent)"
      />
      <path
        d="M46.401 21.4505L52 31.5495L44.3723 35L52 38.4505L46.401 48.5495L39.6659 43.4158L40.6396 52H29.3604L30.3341 43.4158L23.599 48.5495L18 38.4505L25.6277 35L18 31.5495L23.599 21.4505L30.3341 26.5842L29.3604 18H40.6396L39.6659 26.5842L46.401 21.4505Z"
        fill="var(--accent)"
        className={styles.star}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70 180H0V250H70V180ZM60 190H10V240H60V190Z"
        fill="var(--accent)"
      />
      <path
        d="M46.401 201.45L52 211.55L44.3723 215L52 218.45L46.401 228.55L39.6659 223.416L40.6396 232H29.3604L30.3341 223.416L23.599 228.55L18 218.45L25.6277 215L18 211.55L23.599 201.45L30.3341 206.584L29.3604 198H40.6396L39.6659 206.584L46.401 201.45Z"
        fill="var(--accent)"
        className={styles.star}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M210 160H160V210H210V160ZM200 170H170V200H200V170Z"
        fill="var(--accent)"
      />
      <path d="M180 180H190V190H180V180Z" fill="var(--accent)" />
    </svg>
  );
}

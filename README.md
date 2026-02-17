# CRT Solver

Computes solutions to systems of congruences using the Chinese Remainder Theorem (CRT).

### [Live demo](https://zamilbahri.github.io/crt-solver)

## Mathematical form

The solver accepts a system of congruences of the form:

    x ≡ a_1 (mod m_1)
    x ≡ a_2 (mod m_2)
    ...
    x ≡ a_n (mod m_n)

When the moduli m*1, m_2, ..., m_n are pairwise coprime, the Chinese Remainder Theorem
guarantees a unique solution modulo M = m_1 * m*2 * ... _ m_n. The computed value x
satisfies each congruence x ≡ a_i (mod m_i); any other solution differs from x by a
multiple of M (that is, x + k _ M for integer k).

## Algorithm (high level)

- Compute the total modulus M = product of all m_i.
- For each term i: compute M*i = M / m_i, find the modular inverse of M_i modulo m_i
  using the extended Euclidean algorithm, then add the contribution a_i * M*i * y_i to a running sum.
- Reduce the sum modulo M to obtain the unique solution in range 0..M-1.

## Implementation notes

Implemented in TypeScript and uses BigInt for exact integer math.

import { rankPlayers } from "../helpers/RankUtil";

describe('rankPlayers', () => {
    test('returns an array with the correct number of elements', () => {
      const input = {
        Community: ["3D", "KH", "AS", "5C", "9D"],
        Joe: ["3S", "6H"],
        Sam: ["2C", "JS"],
        Ken: ["2D", "JH"]
      };
      const result = rankPlayers(input);
      expect(result.length).toBe(3);
    });
  
    test('returns the correct rankings and names', () => {
      const input = {
        Community: ["3D", "KH", "AS", "5C", "9D"],
        Joe: ["3S", "6H"],
        Sam: ["2C", "JS"],
        Ken: ["2D", "JH"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Joe',
        'Rank 2: Sam',
        'Rank 3: Ken'
      ]);
    });

    test('Three of a Kind vs Straight', () => {
      const input = {
        Community: ["7D", "8H", "5S", "10C", "JD"],
        Alice: ["5D", "5C"],
        Bob: ["2C", "9D"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Bob',
        'Rank 2: Alice'
      ]);
    });


    test('Full House vs Flush', () => {
      const input = {
        Community: ["2H", "3H", "4H", "5H", "5D"],
        Alice: ["3D", "5S"],
        Bob: ["8H", "10H"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Alice',
        'Rank 2: Bob'
      ]);
    });

    test('Royal Flush vs Straight Flush', () => {
      const input = {
        Community: ["QH", "KD", "JD", "10D", "QD"],
        Alice: ["6C", "AD"],
        Bob: ["5C", "9D"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Alice',
        'Rank 2: Bob'
      ]);
    });

    test('Four of a Kind vs Full House', () => {
      const input = {
        Community: ["4S", "4C", "4D", "QS", "KD"],
        Alice: ["4H", "2D"],
        Bob: ["KC", "KS"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Alice',
        'Rank 2: Bob'
      ]);
    });

    test('Two Pair vs One Pair', () => {
      const input = {
        Community: ["AS", "KD", "2S", "JC", "10S"],
        Bob: ["KC", "3C"],
        Charlie: ["AD", "JD"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Charlie',
        'Rank 2: Bob'
      ]);
    });

    test('Flush vs Straight vs Two Pair', () => {
      const input = {
        Community: ["5H", "7H", "8D", "10H", "AD"],
        Alice: ["6H", "4D"],  // straight 
        Bob: ["AC", "10C"],
        Charlie: ["QH", "KH"] // flash H
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Charlie',
        'Rank 2: Alice',
        'Rank 3: Bob'
      ]);
    });


    test('High Card vs High Card Tie', () => {
      const input = {
        Community: ["2H", "4C", "6D", "8S", "10C"],
        Alice: ["3S", "5H"],
        Bob: ["3C", "5D"]
      };
      const result = rankPlayers(input);
      expect(result).toEqual([
        'Rank 1: Alice',
        'Rank 2: Bob'
      ]);
    });
  });
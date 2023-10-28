import Race from '../../src/model/Race';

describe('Race 클래스', () => {
  let mockCars;
  let race;

  beforeEach(() => {
    mockCars = [
      { name: 'pobi', move: jest.fn(), getRepresentation: jest.fn(), position: 1 },
      { name: 'wono', move: jest.fn(), getRepresentation: jest.fn(), position: 2 },
      { name: 'jun', move: jest.fn(), getRepresentation: jest.fn(), position: 3 },
      { name: 'huni', move: jest.fn(), getRepresentation: jest.fn(), position: 2 },
      { name: 'joe', move: jest.fn(), getRepresentation: jest.fn(), position: 1 }
    ];

    race = new Race(mockCars, 5);
  });

  describe('playRound 메서드', () => {
    test('모든 자동차의 move 함수가 호출되어야 한다', () => {
      race.playRound();
      mockCars.forEach((car) => {
        expect(car.move).toHaveBeenCalled();
      });
    });
  });

  describe('getRoundResults 메서드', () => {
    test('모든 자동차의 현재 상태를 반환해야 한다', () => {
      const results = race.getRoundResults();
      results.forEach((result, index) => {
        expect(result.name).toBe(mockCars[index].name);
        expect(result.representation).toBe(mockCars[index].getRepresentation());
      });
    });
  });

  describe('getWinners 메서드', () => {
    test('가장 먼 거리를 이동한 자동차의 이름을 반환해야 한다', () => {
      const winners = race.getWinners();
      expect(winners).toContain('jun');
    });

    test('가장 먼 거리를 이동하지 않은 자동차의 이름을 반환하지 않아야 한다', () => {
      const winners = race.getWinners();
      expect(winners).not.toContain('pobi');
      expect(winners).not.toContain('joe');
    });
  });

  describe('getWinnersString 메서드', () => {
    test('가장 먼 거리를 이동한 자동차들의 이름을 문자열로 반환해야 한다', () => {
      const winnersString = race.getWinnersString();
      expect(winnersString).toBe('jun');
    });

    test('가장 먼 거리를 이동하지 않은 자동차들의 이름은 문자열에 포함되지 않아야 한다', () => {
      const winnersString = race.getWinnersString();
      expect(winnersString).not.toContain('pobi');
      expect(winnersString).not.toContain('joe');
    });
  });
});

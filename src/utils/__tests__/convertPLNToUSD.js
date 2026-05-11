import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
    it('should return proper value when good input', () => {
        expect(convertPLNToUSD(1)).toBe('$0.29');
        expect(convertPLNToUSD(2)).toBe('$0.57');
        expect(convertPLNToUSD(20)).toBe('$5.71');
        expect(convertPLNToUSD(12)).toBe('$3.43');
    });
    it('should return NaN value when input is text', () => {
        expect(convertPLNToUSD('1')).toBe('NaN');
        expect(convertPLNToUSD('xyz')).toBe('NaN');
        expect(convertPLNToUSD('-8')).toBe('NaN');
    });
    it('should return NaN value when input is empty', () => {
        expect(convertPLNToUSD()).toBe('NaN');
    });
    it('should return "Error" when input is different than number and string', () => {
        expect(convertPLNToUSD({})).toBe('Error');
        expect(convertPLNToUSD([])).toBe('Error');
        expect(convertPLNToUSD(null)).toBe('Error');
        expect(convertPLNToUSD(function() {})).toBe('Error');
    });

    it('should return zero when input is lower than zero', () => {
        expect(convertPLNToUSD(-1)).toBe('$0.00');
        expect(convertPLNToUSD(-2)).toBe('$0.00');
        expect(convertPLNToUSD(-56)).toBe('$0.00');
    });
});

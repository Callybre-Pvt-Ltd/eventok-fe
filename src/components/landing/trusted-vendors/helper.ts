export const trustedBrands = [
  'Taj Hotels',
  'Reliance',
  'Infosys',
  'HDFC Bank',
  'Tata Group',
  'Mahindra',
] as const;

export function useTrustedVendors() {
  return { brands: trustedBrands };
}

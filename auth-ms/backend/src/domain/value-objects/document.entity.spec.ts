import { Document } from './document';

describe('Document class', () => {
  it('Given a valid document type and number when creating an instance i can get them', () => {
    const document = Document.createFrom('DNI', 38998408);
    expect(document).toBeInstanceOf(Document);
  });

  it('Given a invalid document type when creating an instance then error is returned', () => {
    expect(() => Document.createFrom('GTI', 38998408)).toThrowError(
      'Document type is invalid',
    );
  });
});

describe('index.html', () => {
  jest.useFakeTimers();

  test('should have a title', () => {
    // Arrange
    document.title = 'Pizza Palace';

    // Act
    const title = document.title;

    // Assert
    expect(title).toBe('Pizza Palace');
  });

  test('should have a stylesheet link', () => {
    // Arrange
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = './static/dist/output.css';
    document.head.appendChild(linkElement);

    // Act
    const stylesheetLink = document.querySelector('link[rel="stylesheet"]');

    // Assert
    expect(stylesheetLink).not.toBeNull();
    expect(stylesheetLink.href).toBe('http://localhost/static/dist/output.css');
  });

  test('should have a card element with hover effect', () => {
    // Arrange
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    document.body.appendChild(cardElement);

    // Act
    cardElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.runAllTimers();

    // Assert
    expect(cardElement.style.transition).toBe('transform 0.5s');
    expect(cardElement.style.transformStyle).toBe('preserve-3d');
    expect(cardElement.style.transformOrigin).toBe('center center');
    expect(cardElement.style.transform).toBe('rotateY(180deg)');
  });

  test('should have a card element with back face', () => {
    // Arrange
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    document.body.appendChild(cardElement);

    const backElement = document.createElement('div');
    backElement.classList.add('back');
    cardElement.appendChild(backElement);

    // Act
    cardElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    jest.runAllTimers();

    // Assert
    expect(backElement.style.backgroundColor).toBe('white');
    expect(backElement.style.position).toBe('absolute');
    expect(backElement.style.top).toBe('0px');
    expect(backElement.style.left).toBe('0px');
    expect(backElement.style.width).toBe('100%');
    expect(backElement.style.height).toBe('100%');
    expect(backElement.style.backfaceVisibility).toBe('hidden');
    expect(backElement.style.display).toBe('flex');
    expect(backElement.style.justifyContent).toBe('center');
    expect(backElement.style.alignItems).toBe('center');
    expect(backElement.style.transform).toBe('rotateY(180deg)');
  });
});

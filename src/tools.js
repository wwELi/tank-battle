export function getShootingDirection(centerX, centerY, direction, width) {
    switch(direction) {
      case 'UP':
        return [centerX, centerY - width];
      case 'RIGHT':
        return [centerX + width, centerY];
      case 'DOWN':
        return [centerX, centerY + width];
      case 'LEFT':
        return [centerX - width, centerY];
    }
  }
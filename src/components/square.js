const Square = ({ isBomb, onClick, onRightClick, disabled, isFlagged }) =>
  <button className={isBomb ? 'bomb' : null}
          onClick={() => onClick()}
          onContextMenu={(e) => onRightClick(e)}
          disabled={disabled}>{isFlagged ? 'F' : ''}</button>

export default Square
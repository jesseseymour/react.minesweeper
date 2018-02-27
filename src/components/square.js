const Square = ({ isBomb, onClick, onRightClick, disabled, isFlagged, id }) =>
  <button className={isBomb ? 'bomb' : null}
          onClick={() => onClick()}
          onContextMenu={(e) => onRightClick(e)}
          disabled={disabled}>{/* isFlagged ? 'F' : '' */id}</button>

export default Square
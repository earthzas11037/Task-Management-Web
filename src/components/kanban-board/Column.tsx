import React, { useMemo, useState } from 'react';
import Task from '../../common/models/task';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import Card from './Card';
import DropIndicatior from './DropIndicatior';
import AddCard from './AddCard';
import { useTaskStore } from '../../stores/task/useTaskStore';

interface Props {
  title: string;
  color: string;
  borderColors: string;
  cards: Task[];
  column: TaskStatusEnum;
  setCards: (data: any) => void;
  onClickEdit: (data: Task) => void;
  onCloseEdit: () => void;
}

const ColumnComponent = ({ title, color, borderColors, cards, column, setCards, onClickEdit }: Props) => {
  const { updateTask } = useTaskStore();
  const [active, setActive] = useState(false);

  const filteredCards = useMemo(() => cards.filter((c) => c.status === column), [cards, column]);

  const handleDragStart = (e: any, card: Task) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragEnd = (e: any) => {
    const cardId = e.dataTransfer.getData('cardId');
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';
    if (before != cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id == cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status: column };

      // fetch update
      updateTask(cardToTransfer, cardToTransfer.id);

      copy = copy.filter((c) => c.id != cardId);

      copy.push(cardToTransfer);

      setCards(copy);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = '0';
    });
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = '1';
  };

  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <div className="w-72 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${color}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
      </div>
      <div onDrop={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="h-full w-full transition-colors">
        {filteredCards.map((c: Task) => (
          <Card borderColors={borderColors} key={c.id} data={c} column={column} handleDragStart={handleDragStart} onClickEdit={onClickEdit} />
        ))}
        <DropIndicatior beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Column = React.memo(ColumnComponent);
export default Column;

import dayjs from 'dayjs';
import type { Message } from '../../context/interfaces/types';

export const messages: Array<Message> = [
  {
    id: 'uuid-1',
    foreignName: 'Joe Bloggs',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor enim, id pharetra ex ultricies id. Proin nec feugiat risus, nec dapibus libero. Curabitur bibendum arcu in dui convallis, a gravida metus euismod. Donec sodales eros sit amet neque gravida fermentum.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-2',
        user: 'foreign',
        text: 'Vivamus aliquet velit ac nisi malesuada, a volutpat ligula fringilla. Integer dapibus interdum ligula, vel laoreet justo feugiat vel.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-3',
        user: 'owner',
        text: 'Ut porttitor odio a lorem ultrices, vitae feugiat metus auctor. Cras bibendum libero id ipsum cursus vulputate.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-4',
        user: 'foreign',
        text: 'Nunc a enim eu risus accumsan condimentum. Sed aliquet magna at eros vehicula volutpat.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-5',
        user: 'owner',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-6',
        user: 'foreign',
        text: 'Aliquam at sapien sit amet nisi auctor faucibus. Quisque cursus, nunc ac fermentum auctor, tortor libero dapibus nisi, a fringilla quam justo a augue.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-7',
        user: 'owner',
        text: 'Integer laoreet eros nec sollicitudin posuere. Nulla facilisi.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-8',
        user: 'foreign',
        text: 'Maecenas tempus eros eget risus iaculis, ut vulputate augue bibendum. Donec id eros et metus pulvinar sodales.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-9',
        user: 'owner',
        text: 'Morbi fringilla nisl non augue vehicula, non luctus ex gravida.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-10',
        user: 'foreign',
        text: 'Sed blandit nulla a nunc viverra, id vehicula odio tincidunt. Phasellus ut felis lectus.',
        time: dayjs().unix()
      },
      {
        id: 'uuid-11',
        user: 'owner',
        text: 'Curabitur tristique sapien a augue facilisis, sit amet pharetra nisi cursus. Fusce euismod tristique nisi.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-2',
    foreignName: 'Sam Smith',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Phasellus tincidunt purus sit amet velit dapibus, ac suscipit risus tincidunt. Aliquam in est lectus.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-3',
    foreignName: 'Alice Johnson',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Ut ut nisl vel justo interdum bibendum. Sed in velit lectus.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-4',
    foreignName: 'Bob Brown',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Curabitur ac odio nec justo efficitur convallis vel id turpis.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-5',
    foreignName: 'Carol White',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Quisque ac sapien in velit interdum hendrerit. Cras vitae turpis tincidunt.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-6',
    foreignName: 'David Green',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Sed consequat quam sed eros elementum, nec scelerisque eros viverra.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-7',
    foreignName: 'Eve Black',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Donec sit amet justo quis orci tincidunt faucibus.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-8',
    foreignName: 'Frank Grey',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Aenean tincidunt, sapien vel molestie fringilla, justo nisi vulputate odio.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-9',
    foreignName: 'Grace Blue',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Vivamus accumsan lorem id risus mollis, vel dictum elit sodales.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-10',
    foreignName: 'Hank Violet',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Mauris quis enim ac est tincidunt aliquam. Donec a urna ex.',
        time: dayjs().unix()
      }
    ]
  },
  {
    id: 'uuid-11',
    foreignName: 'Monkey Man',
    messages: [
      {
        id: 'uuid-1',
        user: 'owner',
        text: 'Mauris quis enim ac est tincidunt aliquam. Donec a urna ex.',
        time: dayjs().unix()
      }
    ]
  }
];

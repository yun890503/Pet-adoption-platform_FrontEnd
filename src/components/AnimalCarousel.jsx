import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const label = {
  photo: '\u7167\u7247',
  prev: '\u4e0a\u4e00\u5f35\u7167\u7247',
  next: '\u4e0b\u4e00\u5f35\u7167\u7247',
};

export default function AnimalCarousel({ images, name, compact = false, height }) {
  const [active, setActive] = useState(0);
  const safeImages = images?.length ? images : ['https://placehold.co/900x650/fff8ea/6f451f?text=Warm+Paws'];
  const fallbackHeight = compact ? { base: '150px', md: '170px', xl: '190px' } : { base: '210px', md: '230px' };

  const move = (event, step) => {
    event.stopPropagation();
    setActive((current) => (current + step + safeImages.length) % safeImages.length);
  };

  return (
    <Box position="relative" h={height || fallbackHeight} overflow="hidden">
      <Image
        src={safeImages[active]}
        alt={`${name} ${label.photo} ${active + 1}`}
        w="100%"
        h="100%"
        objectFit="cover"
        loading="lazy"
        decoding="async"
        transition="transform 0.35s ease"
        _groupHover={{ transform: 'scale(1.04)' }}
      />
      {safeImages.length > 1 && (
        <>
          <IconButton
            aria-label={label.prev}
            icon={<FaChevronLeft />}
            position="absolute"
            left={2}
            top="50%"
            transform="translateY(-50%)"
            boxSize={compact ? '30px' : '38px'}
            minW={compact ? '30px' : '38px'}
            rounded="full"
            bg="rgba(255, 255, 255, 0.86)"
            color="warm.brown"
            fontSize={compact ? 'xs' : 'md'}
            onClick={(event) => move(event, -1)}
          />
          <IconButton
            aria-label={label.next}
            icon={<FaChevronRight />}
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            boxSize={compact ? '30px' : '38px'}
            minW={compact ? '30px' : '38px'}
            rounded="full"
            bg="rgba(255, 255, 255, 0.86)"
            color="warm.brown"
            fontSize={compact ? 'xs' : 'md'}
            onClick={(event) => move(event, 1)}
          />
        </>
      )}
      <Flex position="absolute" bottom={2} left="0" right="0" justify="center" gap={1.5}>
        {safeImages.map((image, index) => (
          <Box
            key={`${image}-${index}`}
            boxSize={index === active ? '7px' : '6px'}
            rounded="full"
            bg={index === active ? 'white' : 'rgba(255,255,255,0.58)'}
            border="1px solid"
            borderColor="whiteAlpha.700"
          />
        ))}
      </Flex>
    </Box>
  );
}
